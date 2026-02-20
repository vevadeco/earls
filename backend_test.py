import requests
import sys
import json
from datetime import datetime

class EarlsLandscapingAPITester:
    def __init__(self, base_url="https://gta-lawn-funnel.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.admin_token = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_base}/{endpoint}" if not endpoint.startswith('http') else endpoint
        
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "url": url,
                    "response": response.text[:500] if response.text else "No response"
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200] if response.text else 'No response'}")
                return False, {}

        except requests.exceptions.Timeout:
            self.failed_tests.append({
                "test": name,
                "error": "Request timeout (10s)",
                "url": url
            })
            print(f"❌ Failed - Request timeout")
            return False, {}
        except Exception as e:
            self.failed_tests.append({
                "test": name,
                "error": str(e),
                "url": url
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200
        )

    def test_create_lead_valid(self):
        """Test creating a lead with valid data"""
        test_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "phone": "(905) 123-4567",
            "service_type": "lawn-care"
        }
        
        return self.run_test(
            "Create Lead (Valid Data)",
            "POST",
            "leads",
            200,  # Based on the LeadResponse model, this should return 200
            data=test_data
        )

    def test_create_lead_invalid_email(self):
        """Test creating a lead with invalid email"""
        test_data = {
            "name": "John Smith",
            "email": "invalid-email",
            "phone": "(905) 123-4567",
            "service_type": "lawn-care"
        }
        
        return self.run_test(
            "Create Lead (Invalid Email)",
            "POST",
            "leads",
            422,  # Validation error
            data=test_data
        )

    def test_create_lead_missing_fields(self):
        """Test creating a lead with missing required fields"""
        test_data = {
            "name": "John Smith"
            # Missing email, phone, service_type
        }
        
        return self.run_test(
            "Create Lead (Missing Fields)",
            "POST",
            "leads",
            422,  # Validation error
            data=test_data
        )

    def test_create_lead_empty_name(self):
        """Test creating a lead with empty name"""
        test_data = {
            "name": "",
            "email": "john@example.com",
            "phone": "(905) 123-4567",
            "service_type": "lawn-care"
        }
        
        return self.run_test(
            "Create Lead (Empty Name)",
            "POST",
            "leads",
            422,  # Validation error due to min_length=1
            data=test_data
        )

    def test_get_leads(self):
        """Test getting all leads"""
        return self.run_test(
            "Get All Leads",
            "GET",
            "leads",
            200
        )

    def test_status_check_create(self):
        """Test creating a status check"""
        test_data = {
            "client_name": "Test Client"
        }
        
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )

    def test_status_check_get(self):
        """Test getting status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

    def test_various_service_types(self):
        """Test creating leads with different service types"""
        service_types = [
            "lawn-care",
            "garden-planting", 
            "hardscaping",
            "full-service"
        ]
        
        results = []
        for service_type in service_types:
            test_data = {
                "name": f"Test User {service_type}",
                "email": f"test.{service_type}@example.com",
                "phone": "(905) 555-1234",
                "service_type": service_type
            }
            
            success, response = self.run_test(
                f"Create Lead ({service_type})",
                "POST",
                "leads",
                200,
                data=test_data
            )
            results.append(success)
        
        return all(results)

def main():
    """Main test runner"""
    print("🚀 Starting Earl's Landscaping API Tests")
    print("=" * 50)
    
    tester = EarlsLandscapingAPITester()
    
    # Run all tests
    tests = [
        tester.test_api_root,
        tester.test_create_lead_valid,
        tester.test_create_lead_invalid_email,
        tester.test_create_lead_missing_fields,
        tester.test_create_lead_empty_name,
        tester.test_get_leads,
        tester.test_status_check_create,
        tester.test_status_check_get,
        tester.test_various_service_types
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {str(e)}")
            tester.failed_tests.append({
                "test": test.__name__,
                "error": f"Test crashed: {str(e)}"
            })

    # Print results summary
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.failed_tests:
        print("\n❌ FAILED TESTS:")
        for i, failure in enumerate(tester.failed_tests, 1):
            print(f"\n{i}. {failure.get('test', 'Unknown Test')}")
            if 'expected' in failure:
                print(f"   Expected: {failure['expected']}, Got: {failure['actual']}")
            if 'error' in failure:
                print(f"   Error: {failure['error']}")
            if 'url' in failure:
                print(f"   URL: {failure['url']}")
            if 'response' in failure:
                print(f"   Response: {failure['response'][:200]}...")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())