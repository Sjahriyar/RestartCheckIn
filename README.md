# RestartCheckIn

A Team-Work project for Restart.Network ...
Students Check-in and track system for the Restart School. developed with Node.JS and MySQL, as hardware we used Rasberry pi 3 and RFID Reader.
There is a Live-Check in page as index, which is always on standby waiting for users to tap their entrance card, after tapping in if they are earlier than 9:00 am they will hear a message which is Good Morning, Welcome.

if they arrive after 9:00 they will receive a friendly notification in the Slack, and if within 3 days they are late again, they will be placed in Cool-Down period, which means first they have to clean all the dishes is kitchen, and untill 1 week they cannot be late anymore otherwise they will be out of the program. unless admin press the excuse button in control-panel so that the student will not receive any notification because he had an acceptable excuse.
all the notifications will be played as audio on screen and also With Slack-API they will receive the notification. 

On the other side of application is Admin Panel, Which is a complete school/student management for the manager of the school.
he/she can add new bootcamps and place students information in that bootcamp with informations and picture of each student, CRUD operator is almost all over the control pannel so that admin can Add/View/Edit/Delete Bootcamps or Students, or even stop an student if the person failed in exam, so that he/she cannot participate anymore, but he/she will not be removed from Data-Base.

There is Report page also, which admin can see full check-in times of all or specific student by using date and name filter.

Also admin can edit he's own information.

Furthur features are still in progress.

Shahriyar , Misheil , Ivas , Irene.
