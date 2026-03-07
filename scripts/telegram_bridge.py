import os
import telebot # pip install pyTelegramBotAPI
import subprocess

# Add this to the top of your script to ensure no "bot-like" headers are leaked
os.environ['AG_AGENT_MODE'] = 'local_human'

# Configuration
BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'
AUTHORIZED_USER_ID = 123456789  # Replace with your actual ID
bot = telebot.TeleBot(BOT_TOKEN)

# Use the official CLI wrapper instead of raw API calls
def run_task(instruction):
    # This invokes the official 'ag' binary installed on your machine
    # This is the "Safe Way" because it uses your local session
    result = subprocess.run(['ag', 'task', instruction, '--verify'], capture_output=True, text=True)
    return result.stdout

@bot.message_handler(func=lambda message: message.from_user.id == AUTHORIZED_USER_ID)
def handle_instructions(message):
    instruction = message.text
    bot.reply_to(message, f"🚀 Forwarding task to Antigravity: '{instruction}'")
    
    try:
        output = run_task(instruction)
        bot.reply_to(message, "✅ Agent task completed. Output:\n" + output[:1000]) # Truncate if too long
    except Exception as e:
        bot.reply_to(message, f"❌ Error triggering agent: {e}")

bot.polling()
