import 'package:flutter/material.dart';
import 'package:sliver_tools/sliver_tools.dart';

import '../../core/core_shelf.dart';
import '../views_shelf.dart';

class IExpansionPanel {
  bool isOpen;
  final Row headerRow;
  final Widget body;

  IExpansionPanel(
      {required this.isOpen, required this.headerRow, required this.body});
}

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  int _selectedIndex = 2;
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    navigateWithIndex(context, index, true);
  }

  List<IExpansionPanel> panelList = List.generate(
      2,
      (i) => IExpansionPanel(
          isOpen: false,
          headerRow: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Text("Farmland ${++i}", textAlign: TextAlign.center),
            ],
          ),
          body: Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 15),
              child: OutlinedButton(
                onPressed: () {},
                style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Colors.black)),
                child: const Text(
                  "Edit",
                  style: TextStyle(color: Colors.black),
                ),
              ),
            ),
          )));

  Widget expansionPanel(List<IExpansionPanel> panels) {
    return ExpansionPanelList(
        dividerColor: Colors.grey,
        expandedHeaderPadding:
            const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        expansionCallback: (panelIndex, isExpanded) => {
              setState(() {
                panels[panelIndex].isOpen = !isExpanded;
              })
            },
        children: panels.map((panel) {
          return ExpansionPanel(
            isExpanded: panel.isOpen,
            canTapOnHeader: true,
            headerBuilder: (ctx, opened) {
              return Padding(
                padding: const EdgeInsets.all(8.0),
                child: panel.headerRow,
              );
            },
            body: panel.body,
          );
        }).toList());
  }

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: CustomScrollView(slivers: [
          SliverStack(
            children: [
              sliverAppBar(
                context: context,
                title: STitle(
                  label: "Hi, JohnFarmer",
                  subLabel: "Welcome",
                  center: false,
                ),
              ),
              SliverPositioned.fill(
                bottom: -screenSize.height * 0.09,
                top: screenSize.height * 0.09,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    CircleAvatar(
                      radius: 70,
                      backgroundColor: HexColor("#7A7A7A"),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Column(
              children: [
                Container(
                  height: screenSize.height * 0.18,
                  color: HexColor("#D9D9D9"),
                ),
                Container(
                  height: screenSize.height * 0.07,
                  width: screenSize.width,
                  color: HexColor("#F4F4F4"),
                  child: const Center(
                    child: Text(
                      "John Farmer",
                      textAlign: TextAlign.center,
                      textScaleFactor: 1.2,
                    ),
                  ),
                ),
              ],
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(18.0),
              child: expansionPanel(panelList),
            ),
          )
        ]),
        bottomNavigationBar: bottomNavigationBar(_selectedIndex, _onItemTapped),
      ),
    );
  }
}
