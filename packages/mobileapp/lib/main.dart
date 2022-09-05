import 'package:carbon_flutter/features/button/button.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:pixel_perfect/pixel_perfect.dart';

import './core/core_shelf.dart';

void main() {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  runApp(const MyApp());
  FlutterNativeSplash.remove();
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Coffee Carbon Collective',
      theme: getLightTheme(),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({
    super.key,
  });

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return PixelPerfect(
      assetPath: "assets/signin.png",
      scale: 0.9, // scale value (optional)
      initOpacity: 0.4,
      child: SafeArea(
        child: Scaffold(
          body: Padding(
            padding:
                const EdgeInsets.only(top: 25, bottom: 25, left: 5, right: 5),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Container(
                      decoration: BoxDecoration(border: Border.all()),
                      width: MediaQuery.of(context).size.width / 3.2,
                      child: CButton(
                        label: "Back",
                        kind: CButtonKind.ghost,
                        onTap: () {
                          navigate(context, const MyHomePage());
                        },
                        enable: true,
                        expand: true,
                        labelSize: 12,
                        size: CButtonSize.sm,
                      ),
                    ),
                    Container(
                      decoration: BoxDecoration(border: Border.all()),
                      width: MediaQuery.of(context).size.width / 3,
                      child: CButton(
                        label: "Back",
                        kind: CButtonKind.ghost,
                        onTap: () {},
                        enable: true,
                        expand: false,
                        labelSize: 12,
                        size: CButtonSize.sm,
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
