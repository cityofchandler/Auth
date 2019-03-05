USE [MyChandler]
GO

/****** Object:  Table [dbo].[Clients]    Script Date: 3/5/2019 10:55:37 AM ******/
DROP TABLE [dbo].[Clients]
GO

/****** Object:  Table [dbo].[Clients]    Script Date: 3/5/2019 10:55:37 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Clients](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clientId] [varchar](100) NOT NULL,
	[clientSecret] [varchar](100) NOT NULL,
	[trusted] [bit] NOT NULL,
	[tokenSecret] [varchar](255) NOT NULL,
	[redirectURI] [varchar](255) NULL,
	[description] [varchar](255) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Clients] ON 

GO
INSERT [dbo].[Clients] ([id], [clientId], [clientSecret], [trusted], [tokenSecret], [redirectURI], [description]) VALUES (1, N'oauth-consumer-example', N'secret2', 1, N'keyboard cat2', N'https://www.getpostman.com/oauth2/callback', N'OAuth Consumer Example Client')
GO
SET IDENTITY_INSERT [dbo].[Clients] OFF
GO