import 'package:carbon_flutter/features/index.dart';
import 'package:flutter/material.dart';
import 'package:pixel_perfect/pixel_perfect.dart';

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
    // return PixelPerfect(
    //   assetPath: "assets/signin.png",
    //   scale: 0.9, // scale value (optional)
    //   initOpacity: 0.4,
    //   child:
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
                    debugPrint("Sign In");
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

Widget textFormWidget(String title) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        title,
      ),
      const SizedBox(height: 16),
      const TextField(
        enabled: true,
        decoration: InputDecoration(
            fillColor: Color.fromARGB(255, 236, 236, 236),
            filled: true,
            border: UnderlineInputBorder(borderRadius: BorderRadius.zero)),
      ),
    ],
  );
}
