USE [master]
GO

/****** Object:  Database [MyChandler]    Script Date: 3/5/2019 10:52:33 AM ******/
DROP DATABASE [MyChandler]
GO

/****** Object:  Database [MyChandler]    Script Date: 3/5/2019 10:52:33 AM ******/
CREATE DATABASE [MyChandler]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MyChandler', FILENAME = N'Z:\Microsoft SQL Server\MSSQL10_50.ITSERVICE\MSSQL\DATA\MyChandler.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'MyChandler_log', FILENAME = N'Z:\Microsoft SQL Server\MSSQL10_50.ITSERVICE\MSSQL\DATA\MyChandler_log.ldf' , SIZE = 6144KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO