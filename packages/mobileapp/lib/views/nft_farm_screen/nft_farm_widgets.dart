import 'package:flutter/material.dart';

import '../../core/helpers/hex_color.dart';

Widget farmTags(BuildContext ctx, List tags) {
  final mediaQuerySize = MediaQuery.of(ctx).size;
  return SizedBox(
    height: mediaQuerySize.height * 0.1,
    //TODO: change this to grid view
    child: ListView.builder(
        itemCount: tags.length,
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
        itemBuilder: (BuildContext ctx, i) {
          return Row(
            children: [
              Stack(
                children: [
                  Positioned.fill(
                      child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    decoration: const BoxDecoration(
                        color: Colors.black,
                        borderRadius: BorderRadius.all(Radius.circular(20))),
                  )),
                  TextButton(
                      onPressed: () {},
                      child: Text(
                        tags[i],
                        maxLines: 1,
                        style: const TextStyle(color: Colors.white),
                      )),
                ],
              ),
              const SizedBox(
                width: 10,
              )
            ],
          );
        }),
  );
}

Widget farmExpansionPanels() {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 20),
    child: ExpansionPanelList(
      elevation: 1,
      expandedHeaderPadding: EdgeInsets.zero,
      children: [
        ExpansionPanel(
          canTapOnHeader: true,
          headerBuilder: (context, isExpanded) => Padding(
            padding: const EdgeInsets.only(left: 8.0),
            child: Row(
              children: const [Text("Regeneration Plan")],
            ),
          ),
          body: const SizedBox(),
        ),
        ExpansionPanel(
            isExpanded: true,
            canTapOnHeader: true,
            headerBuilder: (context, isExpanded) => Padding(
                  padding: const EdgeInsets.only(left: 8.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text("Fundraising Start"),
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(color: HexColor("#393939")),
                        child: const Text(
                          "15.10.2025",
                          style: TextStyle(color: Colors.white),
                        ),
                      )
                    ],
                  ),
                ),
            body: const Padding(
              padding: EdgeInsets.symmetric(horizontal: 25.0, vertical: 10),
              child: LinearProgressIndicator(
                value: 0.4,
                semanticsLabel: 'Linear progress indicator',
                minHeight: 20,
                backgroundColor: Colors.grey,
                valueColor: AlwaysStoppedAnimation<Color>(Colors.black),
              ),
            ))
      ],
    ),
  );
}

Widget buyToken() {
  return Padding(
    padding: const EdgeInsets.symmetric(vertical: 20),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        InkWell(
          onTap: () {},
          child: Container(
            padding:
                const EdgeInsets.only(left: 14, top: 12, bottom: 12, right: 55),
            alignment: Alignment.centerLeft,
            decoration: BoxDecoration(
              color: Colors.black,
              border: Border.all(color: Colors.black),
            ),
            child:
                const Text("Buy Token", style: TextStyle(color: Colors.white)),
          ),
        ),
        InkWell(
          onTap: () {},
          child: Container(
            padding:
                const EdgeInsets.only(left: 14, top: 12, bottom: 12, right: 55),
            alignment: Alignment.centerLeft,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.black),
            ),
            child: const Text("Buy Coffee"),
          ),
        )
      ],
    ),
  );
}
