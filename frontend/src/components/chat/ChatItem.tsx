// import { Avatar, Box, Typography } from '@mui/material'
// import React from 'react'
// import { useAuth } from '../../context/AuthContext';
// import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
// import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// function extractCodeFromString(message: string) {
//   if (message.includes("```")) {
//     const blocks = message.split("```");
//     return blocks;
//   }
// }

// function isCodeBlock(str: string) {
//   if (
//     str.includes("=") || str.includes(";") || str.includes("[") || str.includes("]") || str.includes("{") || str.includes("}") || str.includes("#") || str.includes("//")
//   ) {
//     return true;
//   }
//   return false;
// }

// const ChatItem = ({
//     content,
//     role,
// }:{
//     content: string,
//     role: "user" | "assistant";
// }) => {
//     const messageBlocks = extractCodeFromString(content);
//     const auth = useAuth();
//    return role == "assistant" ? (
//     <Box
//       sx={{display: "flex", p: 2, bgcolor: "#004d5612", gap: 2, borderRadius: 2, my: 1,
//       }}
//     >
//       <Avatar sx={{ ml: "0" }}>
//         <img src="openai.png" alt="openai" width={"30px"} />
//       </Avatar>
//       <Box>
//           {!messageBlocks && (
//           <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
//         )}
//         {messageBlocks &&
//           messageBlocks.length &&
//           messageBlocks.map((block) =>
//             isCodeBlock(block) ? (
//               <SyntaxHighlighter style={coldarkDark} language="javascript">
//                 {block}
//               </SyntaxHighlighter>
//             ) : (
//               <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
//             )
//           )}
//       </Box>
//       </Box>
//    ): (
//     <Box
//       sx={{
//         display: "flex", p: 2, bgcolor: "#004d56", gap: 2, borderRadius: 2,
//       }}
//     >
//       <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
//         {auth?.user?.name?.[0]}
//         {auth?.user?.name?.split(" ")[1]?.[0]}
//       </Avatar>
//        <Box>
//          {!messageBlocks && (
//           <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
//         )}
//         {messageBlocks && messageBlocks.length && messageBlocks.map((block) =>
//             isCodeBlock(block) ? (
//               <SyntaxHighlighter style={coldarkDark} language="javascript">
//                 {block}
//               </SyntaxHighlighter>
//             ) : (
//               <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
//             )
//           )}
//       </Box>
//       </Box>
//    );
// };

// export default ChatItem;

import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Clean markdown symbols (bold, italic, bullets, etc.)
function cleanMarkdown(text: string): string {
  // Remove **bold** and *italic* markers
  text = text.replace(/\*\*/g, '').replace(/\*/g, '');
  // Remove bullet points and numbered lists
  text = text.replace(/^\s*[\*\-]\s+/gm, ''); // bullets
  text = text.replace(/^\s*\d+\.\s+/gm, ''); // numbered lists
  // Remove extra spaces after cleaning
  return text.trim();
}

 function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string): boolean {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

function splitIntoPoints(text: string): string[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const cleanedContent = cleanMarkdown(content);
  const messageBlocks = extractCodeFromString(cleanedContent);
  const auth = useAuth();

  // If no code blocks, split into points and render each as a separate point
  if (!messageBlocks) {
    const points = splitIntoPoints(cleanedContent);
    return (
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: role === "assistant" ? "#004d5612" : "#004d56",
          gap: 2,
          borderRadius: 2,
          my: 1,
        }}
      >
        <Avatar
          sx={{
            ml: "0",
            bgcolor: role === "assistant" ? "transparent" : "black",
            color: "white",
          }}
        >
          {role === "assistant" ? (
            <img src="openai.png" alt="openai" width="30px" />
          ) : (
            <>
              {auth?.user?.name?.[0]}
              {auth?.user?.name?.split(" ")[1]?.[0]}
            </>
          )}
        </Avatar>
        <Box>
          {points.map((point, index) => (
            <Typography key={index} sx={{ fontSize: "20px", mb: 1 }}>
              {point}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  }


  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: role === "assistant" ? "#004d5612" : "#004d56",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: role === "assistant" ? "transparent" : "black",
          color: "white",
        }}
      >
        {role === "assistant" ? (
          <img src="openai.png" alt="openai" width="30px" />
        ) : (
          <>
            {auth?.user?.name?.[0]}
            {auth?.user?.name?.split(" ")[1]?.[0]}
          </>
        )}
      </Avatar>
      <Box>
        {messageBlocks.map((block, index) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language="javascript"
            >
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} sx={{ fontSize: "20px" }}>
              {block}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;
