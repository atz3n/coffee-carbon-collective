import 'package:carbon_flutter/features/index.dart';
import 'package:flutter/material.dart';
import '../../core/core_shelf.dart';

SliverAppBar sliverAppBar(BuildContext context, String title) {
  final screenSize = MediaQuery.of(context).size;
  return SliverAppBar(
    backgroundColor: HexColor("#060606"),
    automaticallyImplyLeading: false,
    title: Text(title),
    expandedHeight: screenSize.height * 0.18,
    bottom: PreferredSize(
      preferredSize: Size.fromHeight(screenSize.height * 0.09),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Row(
          children: [
            Expanded(
              child: searchTextField("Search"),
            ),
            ElevatedButton(
              onPressed: () {},
              style: const ButtonStyle(
                backgroundColor: MaterialStatePropertyAll<Color>(Colors.black),
              ),
              child: const Icon(CIcons.settingsAdjust),
            )
          ],
        ),
      ),
    ),
  );
}

Widget searchTextField(String hintText) {
  return TextField(
    decoration: InputDecoration(
        hintText: hintText,
        prefixIcon: const Icon(
          CIcons.search,
          color: Colors.black,
        ),
        fillColor: const Color.fromARGB(255, 236, 236, 236),
        filled: true,
        border: const UnderlineInputBorder(borderRadius: BorderRadius.zero)),
  );
}
