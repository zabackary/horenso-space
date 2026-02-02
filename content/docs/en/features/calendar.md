---
title: Using the Calendar
author: Horenso SPACE Team
publishDate: 2026-02-02
description: Learn how to use the club calendar to track events and schedules.
---

# Using the Calendar

The calendar is your club's central hub for tracking practices, performances, meetings, and other events. It helps everyone stay on the same page about when and where activities are happening.

## What is the Calendar?

The **calendar** displays all scheduled events for your club. Members can:

- View upcoming events
- See event details (time, location, description)
- Check who will be absent (via absence reports)

## Viewing the Calendar

### Accessing the Calendar

1. Go to your club page
2. Click **Calendar** in the sidebar
3. Choose a view:
   - **Month view** - See the entire month at a glance
   - **Week view** - Detailed week-by-week breakdown
   - **Day view** - Focus on a single day's events

### What You'll See

Each calendar event shows:

- **Event name** - What activity is happening
- **Date and time** - When it's scheduled
- **Location** (if specified)
- **Absence count** - How many members reported they'll be absent

## Creating Events (Requires Permission)

If you have the `canWriteCalendar` permission, you can create and edit events.

### Adding a New Event

1. Navigate to the calendar
2. Click on the date when you want to add an event
3. Fill in the event details:
   - **Title** - Name of the event (e.g., "Practice", "Performance")
   - **Start time** and **End time**
   - **Location** (optional)
   - **Description** (optional)
4. Click **Create**

### Editing an Event

1. Click on an existing event
2. Click **Edit**
3. Update the details
4. Save changes

### Deleting an Event

1. Click on the event
2. Click **Delete**
3. Confirm deletion

## Calendar and Absence Reports

The calendar integrates closely with the absence report system:

- Members submit absence reports for specific calendar events
- The calendar shows how many members will be absent
- Leaders can click on events to see who reported absences

### How It Works

1. **Event is created** on the calendar (e.g., "Thursday Practice")
2. **Member submits absence report** - "I can't attend Thursday Practice"
3. **Calendar updates** - Shows "1 absence" on that event
4. **Leaders review** - Can see details and approve the absence

## Best Practices

### For Calendar Managers

- **Create events in advance** - Give members time to plan
- **Use consistent naming** - "Practice" not "Prac" or "Practice Session"
- **Include important details** - Location changes, special requirements
- **Update promptly** - Cancel or reschedule events as soon as you know

### For Members

- **Check regularly** - Review the calendar at least weekly
- **Submit absence reports early** - Don't wait until the last minute
- **Sync with personal calendar** - Use external calendar apps if needed

## Calendar Permissions

Understanding who can do what:

| Permission       | Can View | Can Create/Edit | Can Delete |
| ---------------- | -------- | --------------- | ---------- |
| canReadCalendar  | ✅       | ❌              | ❌         |
| canWriteCalendar | ✅       | ✅              | ✅         |
| canManageClub    | ✅       | ✅              | ✅         |

## Tips and Tricks

### Color Coding (Future Feature)

While not yet available, we're working on:

- Different colors for event types (practice, performance, meeting)
- Personal absence indicators
- Conflict warnings

### Recurring Events (Future Feature)

Currently, you'll need to create each event individually. We're planning to add:

- Weekly recurring events
- Custom recurrence patterns
- Bulk event creation

## Troubleshooting

### I can't see any events

- Check that you're viewing the correct month/week
- Verify you have `canReadCalendar` permission
- Ask a club admin if the calendar has been set up

### I can't create events

- You need `canWriteCalendar` or `canManageClub` permission
- Ask a club admin to update your role

### Events aren't showing absence counts

- Absence reports must be linked to the specific calendar event
- Check that the report references the correct event date

## Next Steps

- [Submitting Absence Reports](/docs/en/features/absence-reports)
- [Understanding Roles and Permissions](/docs/en/getting-started/roles)
- [Creating Roles and Inviting Members](/docs/en/getting-started/invites)
