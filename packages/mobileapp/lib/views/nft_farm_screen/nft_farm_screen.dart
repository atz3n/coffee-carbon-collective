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
          )
        ]),
        bottomNavigationBar: bottomNavigationBar(_selectedIndex, _onItemTapped),
      ),
    );
  }
}
