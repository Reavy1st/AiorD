import telegram
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler

# Ganti 'YOUR_BOT_TOKEN' dengan token bot Anda dari BotFather
TOKEN = '7759832456:AAFiUnfkBI52D_OaziVjlo6U0Ed5MxSxjBM'

def start(update, context):
    update.message.reply_text("Halo! Selamat datang di bot kami.")

def menu(update, context):
    user = update.message.from_user
    update.message.reply_text(f"Hall @{user.username} \nSilakan Klik Button All menu", reply_markup=markup())

def button(update, context):
    query = update.callback_query
    query.answer()

    if query.data == 'owner':
        query.edit_message_text(text="Anda memilih tombol Owner.")
    elif query.data == 'web':
        query.edit_message_text(text="Anda memilih tombol Web.")
    elif query.data == 'all_menu':
        all_menu_text = """
        | Owner Menu 
        - /hidetag
        - /payment
        - /done

        | Grub Menu
        - /infogc
        - /antilink
        """
        query.edit_message_text(text=all_menu_text)

def markup():
    keyboard = [
        [InlineKeyboardButton("Owner", callback_data='owner'),
         InlineKeyboardButton("Web", callback_data='web')],
        [InlineKeyboardButton("All Menu", callback_data='all_menu')]
    ]
    return InlineKeyboardMarkup(keyboard)

def main():
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("menu", menu))
    dp.add_handler(CallbackQueryHandler(button))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
