from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import sys
import os
import time
import requests
import json
import random
from faker import Faker
from discord_webhook import DiscordWebhook, DiscordEmbed, webhook

def adidas_api(PROXY, webhook_url, webhook_username):
    try:
        a=random.uniform(0.1,0.3)
        def send_delayed_keys(element, text, delay=a):
            for c in text:
                endtime = time.time() + delay
                element.send_keys(c)
                time.sleep(abs(endtime - time.time()))

        print("Start\n")
        fake = Faker()
        fake_firstname = str(fake.first_name())
        fake_lastname = str(fake.last_name())
        fake_username = str(fake_firstname+fake_lastname+str(random.randint(10000000,999999999))).lower()
        mail_provider = random.choice(["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"])
        fake_email = fake_username+mail_provider
        alph = list('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]<>,.')
        fake_password = ''
        for i in range(random.randint(15,20)):
            fake_password += random.choice(alph)
        months_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        fake_month = random.choice(months_list)
        fake_day = str(random.randint(1,28))
        fake_year = str(random.randint(1930, 2010))
        gender_list = ["Male", "Female"]
        fake_gender = random.choice(gender_list)
        # proxy = "190.112.193.59:1212"
        country_dict= {"Russia (+7)":"0", "Ukraine (+380)":"1", "Nigeria (+234)":"19", 
                        "Italy (+39)":"86", "United States (+1)":"187", "Brazil (+55)":"73", 
                            "Canada (+1)":"36"}
        fake_country = random.choice(list(country_dict.keys()))
        fake_country_code = country_dict[fake_country]
        print("Email username: ", fake_email)
        print("Password:", fake_password + '\n')
        print("proxy: ", PROXY)


        ########## User Agent
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--no-sandbox")
#         chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
        chrome_options.add_argument('--proxy-server=%s' % PROXY)
        driver = webdriver.Chrome(executable_path=os.environ.get("chromedriver"), chrome_options=chrome_options)
        driver.maximize_window()
        url = "https://www.adidas.com/us/account-register"
        driver.delete_all_cookies()
        driver.get(url)
        print("page loaded successfully")
        time.sleep(2)


        #enter firstname
        time.sleep(1)
        firstname = driver.find_element_by_id("registration-firstname-field")
        send_delayed_keys(firstname, fake_firstname)

        #enter lastname
        time.sleep(1)
        lastname = driver.find_element_by_id("registration-lastname-field")
        send_delayed_keys(lastname, fake_lastname)

        #Select gender
        time.sleep(1)
        driver.find_element(By.XPATH, f"//*[text()='{fake_gender}']").click()

        #enter email
        time.sleep(1)
        email = driver.find_element_by_id('registration-email-field')
        send_delayed_keys(email, fake_email+"@gmail.com")

        #input password
        time.sleep(1)
        password = driver.find_element_by_id("registration-password-field")
        send_delayed_keys(password, fake_password)

        #click on the check box
        time.sleep(1)
        driver.find_element_by_id("undefined-registration-ageconfirmation-field").click()

        #click on submit check box
        time.sleep(1)
        driver.find_element_by_id("registration-terms-field ").click()

        #Click on sign up for free
        time.sleep(1)
        driver.find_elements(By.XPATH, "//*[text()='Register']")[1].click()
        print("ACCOUNT SUCCESSFULLY CREATED")
        time.sleep(5)
        driver.quit()
        discord_content = f"ADIDAS ACCOUNT {fake_email}:{fake_password}"
        webhook = DiscordWebhook(url=webhook_url, username=webhook_username, content=discord_content)
        embed = DiscordEmbed(title="**GMAIL ACCOUNT GENERATOR**", color = 242424)
        embed.set_author(name="Bot")
        webhook.add_embed(embed)
        response = webhook.execute()
        return fake_email, fake_password

    #IF THE ABOVE CODE DOES NOT RUN, THEN THE PROXY ADDRESS PROVIDED BY THE USER IS NOT VALID
    except:
        return "INVALID PROXY","INVALID PROXY"
