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
    bool? leadingBack,
    bool? showSearchBar}) {
  final screenSize = MediaQuery.of(context).size;
  return SliverAppBar(
      leadingWidth: 110,
      leading: leadingBack == true
          ? Container(
              alignment: Alignment.centerLeft,
              margin: const EdgeInsets.symmetric(vertical: 5),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.white),
                color: Colors.black,
              ),
              child: TextButton(
                onPressed: () => navigateWithIndex(context, 0, true),
                child: const Text(
                  "Back",
                  style: TextStyle(color: Colors.white),
                ),
              ),
            )
          : null,
      backgroundColor: HexColor("#060606"),
      automaticallyImplyLeading: false,
      title: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title.label),
          if (title.subLabel is String)
            Text(title.subLabel!,
                style: const TextStyle(fontWeight: FontWeight.w300)),
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
