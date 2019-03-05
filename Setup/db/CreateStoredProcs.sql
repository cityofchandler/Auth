USE [MyChandler]
GO
/****** Object:  StoredProcedure [dbo].[clientsById]    Script Date: 3/5/2019 10:59:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[clientsById] 
	@client_id varchar(100)
AS
	SELECT [id]
		,[clientId]
		,[clientSecret]
		,[trusted]
		,[tokenSecret]
		,[redirectURI]
		,[description]
	FROM [dbo].[Clients]
	WHERE [clientId] = @client_id
		



GO
/****** Object:  StoredProcedure [dbo].[userById]    Script Date: 3/5/2019 10:59:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[userById]
	@user_id varchar(100)
AS
	SELECT [id]
		  ,[email]
		  ,([firstName] + [lastName]) as [name]
		  ,[password]
		  ,[verified]
		  ,[createdOn]
		  ,[verifiedOn]
		  ,[suspended]
		  ,[forceReset]
	  FROM [dbo].[Users]
	  WHERE [id] = @user_id

GO