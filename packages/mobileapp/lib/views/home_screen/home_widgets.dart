import 'package:carbon_flutter/features/index.dart';
import 'package:flutter/material.dart';

import '../../core/core_shelf.dart';

Widget tagButtonsBox(BuildContext ctx, List tags) {
  final mediaQuerySize = MediaQuery.of(ctx).size;
  return SizedBox(
    height: mediaQuerySize.height * 0.08,
    child: ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: tags.length,
      itemBuilder: (ctx, i) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 15),
          child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(20))),
              ),
              onPressed: () {},
              child: Text(tags[i])),
        );
      },
    ),
  );
}

Widget trendCard(BuildContext ctx, farmInfo) {
  var size = MediaQuery.of(ctx).size;
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 5),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: size.height * 0.2,
          child: Stack(
            children: [
              Align(
                child: Container(
                  decoration: BoxDecoration(
                      color: HexColor("#F4F4F4"), border: Border.all()),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Align(
                  alignment: Alignment.bottomRight,
                  child: CircleAvatar(
                    backgroundColor: Colors.transparent,
                    child: Icon(CIcons.favorite, color: HexColor("#393939")),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Align(
                  alignment: Alignment.topRight,
                  child: CircleAvatar(
                    backgroundColor: Colors.white,
                    child: Icon(Icons.trending_up, color: HexColor("#393939")),
                  ),
                ),
              )
            ],
          ),
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(farmInfo["location"]),
            Text('@${farmInfo["username"]}')
          ],
        )
      ],
    ),
  );
}
