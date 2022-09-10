import 'package:flutter/material.dart';

Widget textFormWidget(String title) {
  return Wrap(
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
