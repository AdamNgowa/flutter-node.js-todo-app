import 'package:flutter/material.dart';
import 'package:flutter_nodejs/pages/dashboard.dart';
import 'package:flutter_nodejs/pages/login_or_register.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences prefs = await SharedPreferences.getInstance();
  runApp(MyApp(token: prefs.getString('token')));
}

class MyApp extends StatelessWidget {
  final token;
  const MyApp({required this.token, super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Material App',
      home: Scaffold(
        appBar: AppBar(title: const Text('Material App Bar')),
        body: (JwtDecoder.isExpired(token) == false)
            ? Dashboard(token: token)
            : LoginOrRegister(),
      ),
    );
  }
}
