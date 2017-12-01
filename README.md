# RestartCheckIn

A Team-Work project for Restart.Network ...
Students' Check-in and track system for the Restart One bootcamp, developed with Node.JS and MySQL, using Rasberry pi 3 and RFID Reader.

It works like a digital policeman which controls students' attendance but also as a student profile manager. The bootcamp demands full commitment from students during this 6 month period therefore attendance is also very important.

The system has a window of Live-CheckIn, which is always on standby waiting for students to tap their entrance card on RFID reader. After tapping system checks the time when they arrived and accordin to that they get a voice greeting or message together with notification message on Slack.

There is one admin who controls the system. He can add / edit bootcamps and students. He is able to temporarily "stop" the student if he has excuse for not showing up or being late. In this case student will not receive any warning notifications.

There is a Report page also, where admin can see full check-in times of all or specific student by using date and name filter.

Challenges we faced: Slack API and Check-in Conditions.

Further features are still in progress.

Shahriyar , Misheil , Ivas , Irene.
