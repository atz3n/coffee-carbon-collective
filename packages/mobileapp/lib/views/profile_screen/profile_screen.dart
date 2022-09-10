import 'package:flutter/material.dart';
import 'package:sliver_tools/sliver_tools.dart';

import '../../core/core_shelf.dart';
import '../views_shelf.dart';

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
              const SliverPositioned.fill(
                top: 50,
                child: CircleAvatar(),
              ),
            ],
          )
        ]),
        bottomNavigationBar: bottomNavigationBar(_selectedIndex, _onItemTapped),
      ),
    );
  }
}
