echo Finalizando SIGER
taskkill /f /im SIGERAPP.exe
timeout /t 5 /nobreak
cd %userprofile%
cd desktop
start SIGER.lnk