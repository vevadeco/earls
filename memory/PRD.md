# Earl's Landscaping - Lead Generation Funnel PRD

## Original Problem Statement
Build a lead generation funnel website for Earl's Landscaping, a landscaping business in Hamilton, Ontario that provides landscaping services in Hamilton and the GTA.

## User Personas
1. **Homeowners** - Residential property owners in Hamilton/GTA looking for landscaping services
2. **Property Managers** - Managing multiple properties needing ongoing maintenance
3. **New Homeowners** - Recently moved, need yard transformation

## Core Requirements (Static)
- Lead capture form with Name, Email, Phone, Service Type
- Services: Lawn Care & Maintenance, Garden Planting, Hardscaping
- Store leads in MongoDB database
- Earthy/natural color scheme (greens, browns)
- Testimonials section with 4.8 star rating
- Service area map for Greater Toronto & Hamilton Area

## What's Been Implemented (Dec 2025)

### Backend
- FastAPI server with `/api/leads` POST endpoint
- Lead model: name, email, phone, service_type, created_at, status
- MongoDB integration for lead storage
- JWT-based admin authentication
- Analytics tracking (page views, visitors)
- Email notifications via Resend (configured, needs domain verification)

### Frontend - Landing Page
- **Promo Banner**: Countdown timer for Spring Cleanup 15% OFF (March 1st deadline)
- **Navbar**: Sticky navigation with logo, links, CTA button, mobile menu
- **Hero Section**: Split layout with value proposition and embedded lead form
- **Services Section**: Bento grid showcasing 3 services with images
- **Testimonials Section**: 6 testimonials with 4.8 star overall rating
- **Service Area Section**: Interactive map with Hamilton HQ and GTA coverage
- **Footer**: Contact info, services, areas, business hours

### Frontend - Admin Dashboard (/admin)
- **Login**: Username/password authentication (shahbaz / Shaherzad123!)
- **Stats Cards**: Total Leads, Page Views, Conversion Rate, Weekly Stats
- **Daily Activity Chart**: 7-day visualization of visitors and leads
- **Leads Table**: View all leads with status management
- **Status Updates**: Change lead status (new → contacted → qualified → converted/lost)
- **Export CSV**: Download all leads as CSV file
- **Analytics**: Visitor tracking with session-based unique visitors

### Design
- Color palette: Forest Green (#2F5233), Warm Sand (#F9F7F2), Accent (#D2691E)
- Typography: DM Serif Display (headings), Outfit (body)
- Fully responsive design
- Subtle animations and hover effects

## Technology Stack
- Frontend: React, Tailwind CSS, Shadcn UI
- Backend: FastAPI, Motor (async MongoDB), JWT auth
- Database: MongoDB
- Email: Resend

## Admin Credentials
- URL: /admin/login
- Username: shahbaz
- Password: Shaherzad123!

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- [x] Lead capture form
- [x] Backend API for leads
- [x] All landing page sections
- [x] Admin dashboard with login
- [x] Analytics tracking
- [x] Promotion banner with countdown

### P1 (High Priority) - Pending
- [ ] Verify domain in Resend for email delivery to any address
- [ ] Photo gallery of past work
- [ ] Lead export with date filters

### P2 (Medium Priority) - Future
- [ ] Scheduling/booking integration
- [ ] Live chat widget
- [ ] SEO optimization
- [ ] Google Analytics integration

### P3 (Nice to Have)
- [ ] Multi-language support (French)
- [ ] Customer portal
- [ ] Quote calculator

## Email Setup Note
Email notifications are configured via Resend but currently in **test mode**. 
To send emails to any recipient:
1. Go to https://resend.com/domains
2. Add and verify your domain (e.g., earlslandscaping.ca)
3. Update SENDER_EMAIL in backend/.env to use your verified domain

## Next Tasks
1. Verify a domain in Resend for production email delivery
2. Add photo gallery showcasing completed projects
3. Integrate Google Analytics for deeper insights
