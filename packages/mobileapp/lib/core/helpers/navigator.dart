import 'package:flutter/material.dart';

void navigate(BuildContext context, Widget page) {
  Navigator.push<void>(
    context,
    MaterialPageRoute<void>(
      builder: (BuildContext context) => page,
    ),
  );
}
