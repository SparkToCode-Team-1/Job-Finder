@echo off
cd /d "c:\Users\NITROV~1\Desktop\RHALFR~1\backend"
setlocal
set "JAVA_HOME="
set "M2_HOME="
java -version
echo.
echo Starting Spring Boot application...
echo.
java -cp ".mvn\wrapper\maven-wrapper.jar" "-Dmaven.multiModuleProjectDirectory=." org.apache.maven.wrapper.MavenWrapperMain spring-boot:run
pause
