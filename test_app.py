import unittest
from flask import Flask, request

class RegisterTestCase(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

    def test_register_success(self):
        with self.app.test_request_context('/register', method='POST', data={
            'username': 'testuser',
            'snakename': 'testsnake',
            'password': 'testpassword'
        }):
            response = self.client.post('/register')
            self.assertEqual(response.status_code, 302)  # Check if redirected
            self.assertEqual(response.location, 'http://localhost/')  # Check if redirected to homepage

            # You can also check if the user is logged in and if the flash message is displayed

    def test_register_get(self):
        with self.app.test_request_context('/register', method='GET'):
            response = self.client.get('/register')
            self.assertEqual(response.status_code, 200)  # Check if the page is rendered successfully

            # You can also check if the rendered template is correct

if __name__ == '__main__':
    unittest.main()