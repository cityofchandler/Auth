USE [master]
GO

/* For security reasons the login is created disabled and with a random password. */
/****** Object:  Login [mychandler]    Script Date: 3/5/2019 10:54:59 AM ******/
CREATE LOGIN [mychandler] WITH PASSWORD=N'JcSbJtr5XNJYZVx27SXQ/j6L1GirBB8lWzbFVP7hoNM=', DEFAULT_DATABASE=[MyChandler], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

ALTER LOGIN [mychandler] DISABLE
GO