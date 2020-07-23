# Generated by Django 3.0.7 on 2020-07-18 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('partners', '0008_auto_20200716_1913'),
    ]

    operations = [
        migrations.AddField(
            model_name='partner',
            name='billing_address_2',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='partner',
            name='primary_mailing_address_2',
            field=models.CharField(default='1', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='partner',
            name='shipping_address_2',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]