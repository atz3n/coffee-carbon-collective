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
              const EdgeInsets.only(left: 15, right: 15, top: 165, bottom: 15),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
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
                    navigate(context, const HomeScreen());
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
