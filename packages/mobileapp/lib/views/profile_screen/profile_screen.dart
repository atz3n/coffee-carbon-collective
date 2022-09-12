import 'package:carbon_flutter/features/index.dart';
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

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    String username = "John Farmer";
    String avatarImage = "https://www.w3schools.com/howto/img_avatar.png";
    return SafeArea(
      child: Scaffold(
        body: CustomScrollView(slivers: [
          SliverStack(
            children: [
              sliverAppBar(
                context: context,
                actions: const [
                  Padding(
                    padding: EdgeInsets.all(12.0),
                    child: Icon(CIcons.userProfile, size: 40),
                  )
                ],
                title: STitle(
                  label: "Hi, JohnFarmer",
                  subLabel: "Welcome",
                  center: false,
                ),
              ),
              SliverPositioned.fill(
                right: 110,
                left: 110,
                bottom: -screenSize.height * 0.09,
                top: screenSize.height * 0.09,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    CircleAvatar(
                      radius: 70,
                      backgroundImage: NetworkImage(avatarImage),
                    ),
                    Align(
                      alignment: Alignment.bottomCenter,
                      child: Container(
                        decoration: const BoxDecoration(
                            shape: BoxShape.circle, color: Colors.white),
                        child: const Icon(
                          Icons.edit_outlined,
                          size: 30,
                        ),
                      ),
                    ),
                    Align(
                      alignment: Alignment.topRight,
                      child: Container(
                        decoration: const BoxDecoration(
                            shape: BoxShape.circle, color: Colors.white),
                        child: const Icon(
                          Icons.edit_outlined,
                          size: 30,
                        ),
                      ),
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
                  child: Center(
                    child: Text(
                      username,
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
              padding: const EdgeInsets.symmetric(horizontal: 18.0),
              child: expansionPanel(panelList),
            ),
          )
        ]),
        bottomNavigationBar: bottomNavigationBar(_selectedIndex, _onItemTapped),
      ),
    );
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
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  tokensTable(35, 15, 20),
                  const SizedBox(height: 10),
                  OutlinedButton(
                      onPressed: () {},
                      style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Colors.black)),
                      child: const Text(
                        "Edit",
                        style: TextStyle(color: Colors.black),
                      )),
                ],
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
}

Table tokensTable(int total, int sold, int available) {
  return Table(
    border: TableBorder.all(width: 0.1),
    children: [
      TableRow(children: [
        TableCell(
          child: SizedBox(
            height: 50,
            child: Center(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [const Text('Total'), Text('$total Tokens')],
              ),
            ),
          ),
        ),
        TableCell(
          child: SizedBox(
            height: 50,
            child: Center(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [const Text('Sold'), Text('$sold Tokens')],
              ),
            ),
          ),
        ),
        TableCell(
          child: SizedBox(
            height: 50,
            child: Center(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [const Text('Available'), Text('$available Tokens')],
              ),
            ),
          ),
        ),
      ])
    ],
  );
}
