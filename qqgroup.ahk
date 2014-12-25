username = 312315220
password = Qwerty@QQ
nwPath = C:\node-webkit-v0.10.3-win-ia32\nw.exe
indexPath = C:\node-webkit-v0.10.3-win-ia32\qq_grap_group_message\index.html

^!s::

Loop {
	Run %nwPath%
	sleep 1000
	WinMaximize node-webkit
	Click 505, 39
	sleep 500
	send {Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}
	send %indexPath%
	send {enter}

	sleep 5000
	send %username%
	sleep 1000	
	send {tab}%password%
	sleep 1000
	send {tab}{enter}
	WinMinimize node-webkit

	sleep 20000
	WinClose node-webkit
}