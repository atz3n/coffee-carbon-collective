import 'package:flutter/material.dart';

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
    selectedItemColor: const Color(0xff161616),
    onTap: onTap,
    unselectedItemColor: const Color(0xff8D8D8D),
  );
}
