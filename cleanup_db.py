#!/usr/bin/env python3
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path

# Load environment
ROOT_DIR = Path(__file__).parent / "backend"
from dotenv import load_dotenv
load_dotenv(ROOT_DIR / '.env')

async def cleanup_invalid_leads():
    """Remove leads with invalid email addresses"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Find and delete leads with invalid email format (no @ symbol)
    result = await db.leads.delete_many({
        "email": {"$not": {"$regex": "@"}}
    })
    
    print(f"Deleted {result.deleted_count} leads with invalid email addresses")
    
    # List remaining leads
    remaining_leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    print(f"Remaining leads count: {len(remaining_leads)}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(cleanup_invalid_leads())