USE [MyChandler]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 3/5/2019 10:56:27 AM ******/
DROP TABLE [dbo].[Users]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 3/5/2019 10:56:27 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[firstName] [varchar](50) NOT NULL,
	[lastName] [varchar](50) NOT NULL,
	[password] [varchar](max) NOT NULL,
	[verified] [bit] NOT NULL,
	[createdOn] [datetime] NOT NULL,
	[verifiedOn] [datetime] NULL,
	[suspended] [bit] NULL,
	[verificationCode] [varchar](200) NOT NULL,
	[forceReset] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO