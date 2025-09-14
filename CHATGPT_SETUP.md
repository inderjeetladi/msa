# ChatGPT API Integration Setup

This document explains how to set up the ChatGPT API integration for the farmer-facing page.

## Prerequisites

1. An OpenAI API key (get one from https://platform.openai.com/api-keys)
2. Node.js and npm installed

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory of your project and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Install Dependencies

The project already includes the necessary dependencies. If you need to install them:

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

## Features Implemented

### Farmer Question Input
- Input field with ID `farmer-question` for agricultural queries
- Real-time state management with React hooks
- Form validation and submission handling

### ChatGPT API Integration
- API route at `/api/chat` that handles OpenAI requests
- Specialized agricultural prompt for better responses
- Error handling and loading states

### Interactive Elements
- **Suggested Question Buttons**: Click to populate the input field
- **Send Button**: Submit questions to ChatGPT API
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

### Response Display
- Clean, formatted response area
- Loading spinner during API calls
- Error messages with proper styling
- Professional agricultural assistant branding

## API Configuration

The ChatGPT integration uses:
- **Model**: GPT-3.5-turbo (cost-effective for most use cases)
- **Max Tokens**: 1000 (adjustable in the API route)
- **Temperature**: 0.7 (balanced creativity and accuracy)
- **System Prompt**: Specialized for agricultural assistance

## Usage

1. Navigate to the farmer-facing page
2. Type a question in the input field or click a suggested question
3. Click the send button (or press Enter)
4. Wait for the AI response
5. The response will appear below the input area

## Customization

You can customize the AI responses by modifying the system prompt in `src/app/api/chat/route.ts`. The current prompt is optimized for agricultural queries including:
- Agricultural regulations and compliance
- Crop management and best practices
- Pest and disease management
- Soil health and conservation
- Weather and planting recommendations
- USDA programs and applications

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured" error**
   - Make sure you've created `.env.local` with your API key
   - Restart the development server after adding the environment variable

2. **"Failed to get response from AI" error**
   - Check your OpenAI API key is valid
   - Ensure you have sufficient API credits
   - Check the browser console for detailed error messages

3. **CORS or network errors**
   - Make sure you're running the development server
   - Check that the API route is accessible at `/api/chat`

### Support

For issues with the ChatGPT integration, check:
- OpenAI API status: https://status.openai.com/
- OpenAI documentation: https://platform.openai.com/docs
- Project logs in the browser console and terminal
