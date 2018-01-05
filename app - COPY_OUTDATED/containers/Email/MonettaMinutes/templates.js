// give this function title, type, location, date, members, decisions, actions, notes
// hashtag hack af

function createMinutesEmail (data) {
  // lining up the variables
  var title = data.title
  var type = data.type
  var location = data.location
  var date = data.date
  var members = data.members
  var decisions = data.decisions
  var actions = data.actions
  var minutes = data.minutes
  var listMembers = '<strong> Participants: </strong><br/>'
  var listActions = ''
  var listDecisions = ''
  var listMinutes = ''

  //creating the variables that are lists

  for(var i=0;i<members.length;i++) {
    listMembers +=  members[i];
    let val = i + 1
    if (val < members.length) {
      listMembers += ', '
    } else {
      listMembers += '.'
    }
  }

  for(var i=0;i<decisions.length;i++) {
    listDecisions += '<li>' + decisions[i] + '</li>' + ' ';
  }

  for(var i=0;i<actions.length;i++) {
    listActions += '<li>' + actions[i].phrase + '</li>' + ' ';
  }

  for(var i=0;i<minutes.length;i++) {
    listMinutes += '<li>' + minutes[i] + '</li>' + ' ';
  }

  // Now for the even messier part, putting together a stringed html doc (wtf..)
  var readyEmail = ''
  // now we build piece by piece

  var partOne = '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <title></title> <!--[if !mso]><!-- --> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css"> #outlook a { padding: 0; } .ReadMsgBody { width: 100%; } .ExternalClass{ width: 100%; } .ExternalClass * { line-height:100%; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; }</style><!--[if !mso]><!--><style type="text/css"> @media only screen and (max-width:480px) { @-ms-viewport { width:320px; } @viewport { width:320px; } }</style><!--<![endif]--><!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings></xml><![endif]--><!--[if lte mso 11]><style type="text/css"> .outlook-group-fix { width:100% !important; }</style><![endif]--><!--[if !mso]><!--> <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700); @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style> <!--<![endif]--><style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width:100%!important; } }</style></head><body style="background: #ffffff;"> <div class="mj-container" style="background-color:#ffffff;"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="background:#ffffff;font-size:0px;width:100%;" border="0"><tbody><tr><td><div style="margin:0px auto;max-width:600px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;padding-bottom:0px;padding-top:0px;"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:10px;padding-bottom:30px;padding-right:0px;padding-left:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:400px;"><img alt="" height="auto" src="https://monettatech.com/dist/assets/images/nameLogo.png" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;" width="400"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]> </td></tr></table> <![endif]--></td></tr></tbody></table></div></td></tr></tbody></table><!--[if mso | IE]> </td></tr></table> <![endif]--> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--><div style="margin:0px auto;border-radius:50px;max-width:600px;background:#5CA7FF;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;border-radius:50px;background:#5CA7FF;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:10px;padding-bottom:20px;padding-top:0px;"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:20px;padding-right:25px;padding-left:25px;" align="middle"><div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:middle;"><p><span style="color: white;"><span style="font-size: 20px"><strong> Here are your Monetta Minutes: </strong></span></span></p></div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;" align="left"><div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;"><p><span style="color: white;"><span style="font-size: 18px"> '
  readyEmail += partOne
  // Insert the title and type stringed
  readyEmail += '<strong>' + title + '</strong><br/> ' + '<strong>' + location + ' on ' + date + '</strong>'
  // now we insert second parttwo
  var partTwo = '</span></span></p> <p><span style="color: white;"><span style="font-size: 18px">'
  readyEmail += partTwo
  // Insert location and date
  readyEmail += ' <p style="color: white">(' + type + ')</p>'
  // now we insert partthree
  readyEmail += '</span></span></p> <p><span style="color: white;"><span style="font-size: 18px">'
  // Insert list of participants
  readyEmail += '<ul style="color: white"> <strong>' + listMembers+ '</strong></ul>'
  // now we insert part four
  readyEmail += '</span></span></p> <br> <p><span style="color: white;"><span style="font-size: 16px"><strong> Team Decisions </strong></span></span></p> <p><span style="color: white;"><span style="font-size: 16px"> '
  // Insert list of decisions
  readyEmail += '<ul style="color: white; list-style-type: upper-roman">' +listDecisions +'</ul>'
  // now we insert part five
  readyEmail += ' </span></span></p> <br> <p><span style="color: white;"><span style="font-size: 16px"><strong> Action Items </strong></span></span></p> <p><span style="color: white;"><span style="font-size: 16px"> '
  // Insert list of actions
  readyEmail += '<ul style="color: white; list-style-type: upper-alpha">'+ listActions +'</ul>'
  // now we insert part six
  readyEmail += ' </span></span></p> <br> <p><span style="color: white;"><span style="font-size: 16px"><strong> General Notes </strong></span></span></p> <p><span style="color: white;"><span style="font-size: 16px"> '
  // Insert list of minutes
  readyEmail += '<ul style="color: white; list-style-type: square">'+ listMinutes +'</ul>'
  // Finish up email
  readyEmail += ' </span></span></p></div></td></tr></tbody></table></div><!--[if mso | IE]> </td></tr></table> <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]> </td></tr></table> <![endif]--> <!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="background:#ffffff;font-size:0px;width:100%;" border="0"><tbody><tr><td><div style="margin:0px auto;max-width:600px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:middle;direction:ltr;font-size:0px;padding:20px 0px;padding-bottom:20px;padding-top:20px;"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:middle;width:600px;"> <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:middle;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:middle;" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;background:transparent;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;" align="middle" background="transparent"><div style="cursor:auto;color:#009FE3;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:middle;"><p style="font-weight: 400; line-height: 30px; margin: 13px 0px;"><span style="color: rgb(255, 177, 72);"><span style="font-size: 25px;"> No Monetta account? No worries - Try it for free</span></span> </p></div></td></tr><tr><td style="word-wrap:break-word;background:transparent;font-size:0px;padding:15px 30px;" align="center" background="transparent"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0"><tbody><tr><td style="border:none;border-radius:8px;color:#ffffff;cursor:auto;padding:10px 25px;" align="center" valign="middle" bgcolor="#FFB148"><a href="https://monettatech.com" style="text-decoration:none;background:#FFB148;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;text-transform:none;margin:0px;" target="_blank"><span style="font-family: "Open Sans", Helvetica, Arial, sans-serif;"><strong><span style="color: white;"><span style="font-size: 21px;">Create a free Monetta account</span></span> </strong> </span></a></td></tr></tbody></table></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;" align="middle"><div style="cursor:auto;color:#FFB148;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:middle;"><br> <p></p> <p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-family: Arial; font-size: 14.666666666666666px; white-space: pre-wrap; background-color: transparent;"><strong>We are really excited you have decided to give us a try. In case you have any questions, feel free to reach us at team@monettatech.com</strong></span> </p><br> <p></p></div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:25px;padding-left:25px;" align="left"><div style="cursor:auto;color:#FFB148;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;"><p></p> <p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style=" font-family: Arial; font-size: 14.666666666666666px; white-space: pre-wrap; background-color: transparent;"><strong>Thanks,</strong></span></p> <p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:14.666666666666666px;font-family:Arial;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre-wrap;"><strong>The Monetta Team</strong></span> </p> <p></p></div></td></tr></tbody></table></div><!--[if mso | IE]> </td></tr></table> <![endif]--></td></tr></tbody></table></div></td></tr></tbody></table><!--[if mso | IE]> </td></tr></table> <![endif]--></div></body></html> '

  // throw it back to the poor Server
  return readyEmail
}

module.exports = createMinutesEmail;
