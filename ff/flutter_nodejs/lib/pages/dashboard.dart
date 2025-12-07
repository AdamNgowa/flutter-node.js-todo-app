import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_nodejs/components/my_text_field.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:flutter_nodejs/config.dart';

class Dashboard extends StatefulWidget {
  final token;
  const Dashboard({super.key, required this.token});

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  late String userId;
  final TextEditingController _todoTitle = TextEditingController();
  final TextEditingController _todoDesc = TextEditingController();
  List items = [];
  @override
  void initState() {
    super.initState();
    Map<String, dynamic> jwtDecodedToken = JwtDecoder.decode(widget.token);
    userId = jwtDecodedToken['_id'];
    getToDoList(userId);
  }

  void addToDo() async {
    if (_todoTitle.text.isNotEmpty && _todoDesc.text.isNotEmpty) {
      var reqBody = {
        "userId": userId,
        "title": _todoTitle.text,
        "desc": _todoDesc.text,
      };
      try {
        var response = await http.post(
          Uri.parse(addToDoUrl),
          headers: {"Content-Type": "application/json"},
          body: jsonEncode(reqBody),
        );

        var jsonResponse = jsonDecode(response.body);
        if (jsonResponse['status']) {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(SnackBar(content: Text('Todo created successfully')));
          _todoTitle.clear();
          _todoDesc.clear();
          Navigator.pop(context);
          getToDoList(userId);
        } else {
          ScaffoldMessenger.of(
            context,
          ).showSnackBar(SnackBar(content: Text('Failed to create todo')));
        }
      } catch (e) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Error: $e')));
      }
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Todo item not created')));
    }
  }

  void getToDoList(userId) async {
    var reqBody = {"userId": userId};
    var response = await http.post(
      Uri.parse(getToDoListUrl),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(reqBody),
    );
    var jsonResponse = jsonDecode(response.body);
    items = jsonResponse["success"];
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: items.length,
              itemBuilder: (context, int index) {
                return Slidable(
                  child: Card(
                    child: ListTile(
                      title: Text('${items[index]["title"]}'),
                      subtitle: Text('${items[index]["desc"]}'),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),

      floatingActionButton: FloatingActionButton(
        onPressed: _displayTextInputDialog,
        tooltip: 'Add to-do',
        child: Icon(Icons.add),
      ),
    );
  }

  Future<void> _displayTextInputDialog() async {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Add To Do'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              MyTextField(
                controller: _todoTitle,
                hintText: 'Title',
                obscureText: false,
              ),
              MyTextField(
                controller: _todoDesc,
                hintText: 'todo description',
                obscureText: false,
              ),
              ElevatedButton(onPressed: addToDo, child: Text('Add')),
            ],
          ),
        );
      },
    );
  }
}
