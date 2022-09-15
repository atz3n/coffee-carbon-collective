import 'package:carbon_flutter/features/index.dart';
import 'package:flutter/material.dart';

import '../../core/core_shelf.dart';
import '../global_widgets/global_widgets_shelf.dart';

class NftFarmScreen extends StatefulWidget {
  const NftFarmScreen({super.key});

  @override
  State<NftFarmScreen> createState() => _NftFarmScreenState();
}

class _NftFarmScreenState extends State<NftFarmScreen> {
  int _selectedIndex = 0;
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    navigateWithIndex(context, index, true);
  }

  @override
  Widget build(BuildContext context) {
    // final mediaQuerySize = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        body: CustomScrollView(slivers: [
          sliverAppBar(
              context: context,
              title: STitle(label: "NFTLand", center: true),
              showSearchBar: false,
              leadingBack: true,
              username: "JohnFarmer"),
          SliverToBoxAdapter(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [nftImageCard()]),
          )
        ]),
        bottomNavigationBar: bottomNavigationBar(_selectedIndex, _onItemTapped),
      ),
    );
  }
}

Widget nftImageCard() {
  return Stack(
    alignment: AlignmentDirectional.bottomCenter,
    children: [
      Container(
        height: 200,
        color: Colors.grey,
      ),
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CButton(
              kind: CButtonKind.tertiary,
              label: "NFT Land",
              onTap: () {},
            ),
            InkWell(
              onTap: () {},
              child: Container(
                padding: const EdgeInsets.only(
                    left: 14, top: 12, bottom: 12, right: 95),
                alignment: Alignment.centerLeft,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black),
                ),
                child: const Text("Photos"),
              ),
            )
          ],
        ),
      )
    ],
  );
}
