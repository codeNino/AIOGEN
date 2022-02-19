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


def nike_api(PROXY, webhook_url, webhook_username):
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
        fake_username = str(fake_firstname+fake.first_name()+fake_lastname+str(random.randint(1000000000,99999999999))).lower()
        mail_provider = random.choice(["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"])
        fake_email = fake_username+mail_provider
        alph = list('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*(){}[]<>,.')
        fake_password = ''
        for i in range(random.randint(15,20)):
            fake_password += random.choice(alph)
        # months_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        months_list = ["01","02","03","04","05","06","07","08","09","10","11","12"]
        fake_month = str(random.choice(months_list))
        day_list = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"]
        fake_day = random.choice(day_list)
        fake_year = str(random.randint(1930, 2010))
        fake_dob = fake_month+"-"+fake_day+"-"+fake_year
        gender_list = ["Male", "Female"]
        fake_gender = random.choice(gender_list)
        # proxy = "190.112.193.59:1212"
        locations_list = ["Egypt", "Morocco","South Africa", "Canada", "United States","Australia","Hong Kong","India","Indonesia","Japan",
                        "Malaysia","New Zealand","Philippines","Singapore","Vietnam","Austria","Belgium","Bulgaria","Croatia","Czech Republic","Denmark",
                        "Finland","Hungary","Ireland","Israel","Luxembourg","Netherlands","Norway","Portugal","Romania","Slovakia","Slovenia","Sweden","Switzerland","United Kingdom","Saudi Arabia",
                        "United Arab Emirates"]
        fake_location = random.choice(locations_list)
        userAgents_list = ["Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.136 YaBrowser/20.2.2.177 Yowser/2.5 Yptp/1.21 Safari/537.36",
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.115",
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362",
                            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.0.2990 Safari/537.36",
                            "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.136 YaBrowser/20.2.2.177 Yowser/2.5 Yptp/1.21 Safari/537.36",
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.115",
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36"]
        userAgent = random.choice(userAgents_list)
        url = "https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&dsh=S185420504%3A1582184558776735&gmb=exp&biz=true&flowName=GlifWebSignIn&flowEntry=SignUp&hl=en-GB"
        symbol = "+"

        print("Username: ", fake_username)
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

        url = "https://www.nike.com/register"
        driver.delete_all_cookies()
        driver.get(url)
        print("Page load successful")
        time.sleep(2)

        #Accept cookies
        try:
            driver.find_element_by_id("hf_cookie_text_cookieAccept").click()
            print("CLick I accept")
        except:
            pass

        try:
            #Click on country
            driver.find_element(By.XPATH, f'//*[@title="{fake_location}"]').click()
            # driver.find_element_by_link_text("Egypt").click()
            print(f"Clicked {fake_location}")

            #back to previous page with back()
            time.sleep(1)
            driver.back()
        except:
            pass

        #enter email address
        time.sleep(2)
        email = driver.find_element_by_name("emailAddress")
        send_delayed_keys(email, fake_email)

        #enter password
        time.sleep(1)
        password = driver.find_element_by_name("password")
        send_delayed_keys(password, fake_password)

        #enter firstname
        time.sleep(1)
        firstname = driver.find_element_by_name("firstName")
        send_delayed_keys(firstname, fake_firstname)

        #enter lastname
        time.sleep(1)
        lastname = driver.find_element_by_name("lastName")
        send_delayed_keys(lastname, fake_lastname)

        #Enter dateOfBirth
        time.sleep(1)
        dob = driver.find_element_by_name("dateOfBirth")
        dob.click()
        dob.send_keys(fake_dob)
        print(fake_dob)
        print("year", fake_year)

        #Select country
        time.sleep(1)
        element = driver.find_element_by_name("country")
        drp = Select(element)
        drp.select_by_visible_text(fake_location)

        #Select gender
        time.sleep(1)
        driver.find_element(By.XPATH, f"//*[text()='{fake_gender}']").click()

        #Click on join us
        time.sleep(3)
        driver.find_element_by_class_name("nike-unite-submit-button").click()
        time.sleep(2)
        driver.close()
        discord_content = f"NIKE ACCOUNT {fake_email}:{fake_password}"
        webhook = DiscordWebhook(url= webhook_url, username= webhook_username, content=discord_content)
        embed = DiscordEmbed(title="**GMAIL ACCOUNT GENERATOR**", color = 242424)
        embed.set_author(name="Bot")
        webhook.add_embed(embed)
        response = webhook.execute()
        return fake_email, fake_password

    #IF THE ABOVE CODE DOES NOT RUN, THEN THE PROXY ADDRESS PROVIDED BY THE USER IS NOT VALID
    except:
        return "INVALID PROXY","INVALID PROXY"
