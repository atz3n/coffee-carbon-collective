import 'package:flutter/material.dart';
import 'package:mobileapp/core/core_shelf.dart';

BottomNavigationBar bottomNavigationBar(
    int selectedIndex, void Function(int) onTap) {
  return BottomNavigationBar(
    items: const <BottomNavigationBarItem>[
      BottomNavigationBarItem(
        icon: Icon(Icons.home),
        label: 'Home',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.business),
        label: 'Business',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.school),
        label: 'School',
      ),
    ],
    currentIndex: selectedIndex,
    selectedItemColor: HexColor("#161616"),
    onTap: onTap,
    unselectedItemColor: HexColor("#8D8D8D"),
  );
}
