import 'package:carbon_flutter/features/index.dart';
import 'package:flutter/material.dart';
import 'package:mobileapp/core/core_shelf.dart';

BottomNavigationBar bottomNavigationBar(
    int selectedIndex, void Function(int) onTap) {
  return BottomNavigationBar(
    items: <BottomNavigationBarItem>[
      BottomNavigationBarItem(
        icon: const Icon(
          CIcons.home,
        ),
        label: 'Home',
        backgroundColor: HexColor("#8D8D8D"),
      ),
      const BottomNavigationBarItem(
        icon: Icon(
          CIcons.wallet,
        ),
        label: 'Business',
      ),
      const BottomNavigationBarItem(
        icon: Icon(CIcons.user),
        label: 'School',
      ),
    ],
    currentIndex: selectedIndex,
    selectedItemColor: HexColor("#161616"),
    backgroundColor: HexColor("#8D8D8D"),
    onTap: onTap,
    unselectedItemColor: Colors.white,
  );
}
