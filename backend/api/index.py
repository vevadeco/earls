"""
Vercel Serverless Adapter for Earl's Landscaping Backend

This file adapts the FastAPI app for Vercel serverless functions.
Place it at: backend/api/index.py
"""

from fastapi import FastAPI
from mangum import Mangum
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import your existing FastAPI app
from server import app as fastapi_app

# Create the handler for Vercel
handler = Mangum(fastapi_app, lifespan="off")

# Vercel requires this handler to be called 'app'
app = handler
