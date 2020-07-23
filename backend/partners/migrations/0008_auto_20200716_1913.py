# Generated by Django 3.0.7 on 2020-07-16 19:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('partners', '0007_auto_20200626_2258'),
    ]

    operations = [
        migrations.RenameField(
            model_name='partner',
            old_name='acct_closure_date',
            new_name='closure_date',
        ),
        migrations.RemoveField(
            model_name='partner',
            name='corp_address',
        ),
        migrations.RemoveField(
            model_name='partner',
            name='corp_city',
        ),
        migrations.RemoveField(
            model_name='partner',
            name='corp_state',
        ),
        migrations.RemoveField(
            model_name='partner',
            name='corp_zip',
        ),
        migrations.RemoveField(
            model_name='partner',
            name='main_email',
        ),
        migrations.RemoveField(
            model_name='partner',
            name='main_fax',
        ),
        migrations.RemoveField(
            model_name='partner',
            name='main_phone',
        ),
        migrations.RemoveField(
            model_name='partner',
            name='status',
        ),
    ]