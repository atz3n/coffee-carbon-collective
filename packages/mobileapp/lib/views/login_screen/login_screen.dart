import 'package:carbon_flutter/features/index.dart';
import 'package:flutter/material.dart';

import '../../core/core_shelf.dart';
import '../home_screen/home_screen.dart';
import './login_widgets.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({
    super.key,
  });

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: Padding(
          padding:
              const EdgeInsets.only(left: 15, right: 15, top: 15, bottom: 15),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Container(
                      margin: const EdgeInsets.symmetric(vertical: 50),
                      padding: const EdgeInsets.only(right: 80),
                      decoration: BoxDecoration(border: Border.all()),
                      child: TextButton(
                        onPressed: () {},
                        child: const Text(
                          "Back",
                          style: TextStyle(color: Colors.black),
                          textAlign: TextAlign.start,
                        ),
                      )),
                  CButton(
                    label: "Sign Up",
                    onTap: () {},
                    kind: CButtonKind.tertiary,
                  )
                ],
              ),
              textFormWidget("Username"),
              SizedBox(height: screenSize.height * 0.02),
              textFormWidget("Password"),
              SizedBox(height: screenSize.height * 0.01),
              const Text(
                "Forgot your password?",
              ),
              SizedBox(height: screenSize.height * 0.39),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: CButton(
                  label: "Sign In",
                  onTap: () {
                    debugPrint("Navigating to HomeScreen");
                    navigate(
                        context: context,
                        page: const HomeScreen(),
                        replace: false);
                  },
                  expand: true,
                  kind: CButtonKind.tertiary,
                  size: CButtonSize.regular,
                  enable: true,
                ),
              )
            ],
          ),
        ),
      ),
      // ),
    );
  }
}
