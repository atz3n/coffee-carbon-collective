import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class UserApiService {
  final String _endpoint = 'api url';
  final Dio _dio = Dio();

  Future<void> loginUser(String email, String password) async {
    try {
      var body = {'email': email, 'password': password};
      var response = await _dio.post(
        '$_endpoint/login',
        data: body,
      );
      // return User.fromJson(response.data['user']);
    } on DioError catch (error, stacktrace) {
      debugPrint('Exception occured: $error stackTrace: $stacktrace');
      // return User.withError(error.toString());
    }
  }
}
