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

  List<bool> isOpen = [false, false, false, false];

  Widget expansionPanel() {
    const content =
        "The accordion component delivers large amounts of content in a small space through progressive disclosure. The user gets key details about the underlying content and can choose to expand that content within the constraints of the accordion.";

    return ExpansionPanelList(
        dividerColor: Colors.grey,
        expandedHeaderPadding: const EdgeInsets.symmetric(vertical: 0),
        expansionCallback: (panelIndex, isExpanded) => {
              setState(() {
                isOpen[panelIndex] = !isExpanded;
              })
            },
        children: isOpen.map((e) {
          return ExpansionPanel(
              isExpanded: e,
              canTapOnHeader: true,
              headerBuilder: (ctx, opened) {
                return Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    const Text("Title of accordion",
                        textAlign: TextAlign.center),
                    CircleAvatar(
                      backgroundColor: Colors.white,
                      maxRadius: 12,
                      child:
                          Icon(Icons.trending_up, color: HexColor("#393939")),
                    )
                  ],
                );
              },
              body: const Padding(
                padding: EdgeInsets.all(10.0),
                child: Text(content),
              ));
        }).toList());
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuerySize = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: CustomScrollView(slivers: [
          sliverAppBar(
              context: context,
              title: STitle(label: "Marketplace", center: true),
              showSearchBar: true),
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
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.only(left: 25, top: 8, right: 25),
              child: Wrap(children: [
                const Text("Newly launched farm tokens"),
                expansionPanel()
              ]),
            ),
          ),
          const SliverToBoxAdapter(
            child: Padding(
              padding:
                  EdgeInsets.only(left: 25, top: 12, right: 25, bottom: 30),
              child: Text("Explore Tokens"),
            ),
          )
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
