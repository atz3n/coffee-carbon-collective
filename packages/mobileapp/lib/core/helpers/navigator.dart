import 'package:flutter/material.dart';

import '../../views/views_shelf.dart';

void navigateWithIndex(BuildContext ctx, int i, bool? replace) {
  switch (i) {
    case 0:
      debugPrint("Navigating to home screen");
      navigate(context: ctx, page: const HomeScreen(), replace: replace);
      break;
    case 1:
      debugPrint("Navigating to wallet screen");
      navigate(context: ctx, page: const HomeScreen(), replace: replace);
      break;
    case 2:
      debugPrint("Navigating to profile screen");
      navigate(context: ctx, page: const ProfileScreen(), replace: replace);
      break;
    default:
      debugPrint("Navigating to home screen");
      navigate(context: ctx, page: const HomeScreen(), replace: replace);
      break;
  }
}

void navigate(
    {required BuildContext context, required Widget page, bool? replace}) {
  if (replace == true) {
    Navigator.pushReplacement<void, void>(context,
        MaterialPageRoute<void>(builder: (BuildContext context) => page));
  } else {
    Navigator.push<void>(context,
        MaterialPageRoute<void>(builder: (BuildContext context) => page));
  }
}
