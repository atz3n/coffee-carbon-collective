import 'package:flutter/material.dart';
import 'package:mobileapp/core/core_shelf.dart';

import '../global_widgets/global_widgets_shelf.dart';
import 'home_widgets.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List tags = ["Colombia", "Brasilien", "Turkey", "Germany"];
  List<Object> farmInfo = [
    {"location": "Farm Location", "username": "User"},
    {"location": "Farm Location", "username": "User"}
  ];

  int _selectedIndex = 0;
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    navigateWithIndex(context, index, true);
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
