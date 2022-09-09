import 'package:flutter/material.dart';
import 'package:mobileapp/core/core_shelf.dart';

// -- deprecated : https://rxlabz.github.io/panache_web/ can use this to generate theme

ThemeData getLightTheme() => ThemeData(
    fontFamily: "IBM Plex Sans",
    elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
      backgroundColor: HexColor("#393939"),
    )));
