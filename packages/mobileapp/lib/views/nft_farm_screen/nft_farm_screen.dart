import 'package:flutter/material.dart';
import 'package:mobileapp/views/views_shelf.dart';

import '../../core/core_shelf.dart';
import 'nft_farm_widgets.dart';

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
            child:
                Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              nftImageCard(),
              tokensTable(total: 52, sold: 10, available: 20, token: "CCT"),
              farmTags(context, [
                "Colombia",
                "Altitude: 1000",
                "100 ha",
                "Coffee Quality SCA: 5",
                "Shaded"
              ]),
              farmExpansionPanels(),
              buyToken()
            ]),
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
          height: 200, decoration: BoxDecoration(color: HexColor("#EBEBEB"))),
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            InkWell(
              onTap: () {},
              child: Container(
                padding: const EdgeInsets.only(
                    left: 14, top: 12, bottom: 12, right: 80),
                alignment: Alignment.centerLeft,
                decoration: BoxDecoration(
                  color: Colors.black,
                  border: Border.all(color: Colors.black),
                ),
                child: const Text("NFT Land",
                    style: TextStyle(color: Colors.white)),
              ),
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
