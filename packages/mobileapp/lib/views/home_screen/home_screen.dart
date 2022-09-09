import 'package:carbon_flutter/features/index.dart';
import 'package:flutter/material.dart';
import 'package:mobileapp/core/core_shelf.dart';

import '../global_widgets/sliver_app_bar.dart';
import '../global_widgets/global_widgets_shelf.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  List tags = ["Colombia", "Brasilien", "Turkey", "Germany"];
  List<Object> farmInfo = [
    {"location": "Farm Location", "username": "User"},
    {"location": "Farm Location", "username": "User"}
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuerySize = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: CustomScrollView(slivers: [
          sliverAppBar(context, "Marketplace"),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.only(left: 15, top: 8),
              child: Wrap(
                children: [const Text("Tags"), tagButtonsBox(context, tags)],
              ),
            ),
          ),
          SliverToBoxAdapter(
              child: Padding(
            padding: const EdgeInsets.only(left: 15, top: 8),
            child: Wrap(
              children: [
                const Text(
                  "Trending Now",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                SizedBox(
                  height: mediaQuerySize.height * 0.27,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemExtent: mediaQuerySize.width * 0.47,
                    itemCount: 2,
                    itemBuilder: ((context, index) {
                      return trendCard(context, farmInfo[index]);
                    }),
                  ),
                ),
              ],
            ),
          )),
          SliverFixedExtentList(
              itemExtent: 50.0,
              delegate: SliverChildBuilderDelegate(
                (BuildContext context, int index) {
                  return Container(
                    padding: const EdgeInsets.all(8),
                    alignment: Alignment.center,
                    color: Colors.lightBlue[100 * (index % 9)],
                    child: Text('List Item $index'),
                  );
                },
              ))
        ], shrinkWrap: true),
        bottomNavigationBar: bottomNavigationBar(_selectedIndex, _onItemTapped),
      ),
    );
  }
}

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
      mainAxisAlignment: MainAxisAlignment.start,
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
          children: [
            Text(farmInfo["location"]),
            Text('@${farmInfo["username"]}')
          ],
        )
      ],
    ),
  );
}
