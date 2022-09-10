import 'package:carbon_flutter/features/index.dart';
import 'package:flutter/material.dart';
import '../../core/core_shelf.dart';

class STitle {
  final String label;
  final String? subLabel;
  final bool? center;

  STitle({required this.label, this.subLabel, this.center});
}

SliverAppBar sliverAppBar(
    {required BuildContext context,
    required STitle title,
    List<Widget>? actions,
    bool? showSearchBar}) {
  final screenSize = MediaQuery.of(context).size;
  return SliverAppBar(
      backgroundColor: HexColor("#060606"),
      automaticallyImplyLeading: false,
      title: Column(
        children: [
          Text(title.label),
          if (title.subLabel is String) Text(title.subLabel!),
        ],
      ),
      centerTitle: title.center,
      actions: actions,
      expandedHeight: screenSize.height * 0.18,
      bottom: showSearchBar == true
          ? PreferredSize(
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
                        backgroundColor:
                            MaterialStatePropertyAll<Color>(Colors.black),
                      ),
                      child: const Icon(CIcons.settingsAdjust),
                    )
                  ],
                ),
              ),
            )
          : null);
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
