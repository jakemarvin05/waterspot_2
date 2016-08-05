/**
 * Created by techticsninja on 7/20/16.
 */
// app/models/user.js
var countryList = require('../apps/countryList.js').withoutRegion();
var crypto = require('crypto');
var encrypter = require('../apps/passport/encrypter');
var forgetPasswordMailer = require('../apps/passport/forgetPasswordMailer.js');

function User(sequelize, DataTypes) {

    var User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        loginType: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        /* TODO: create index on facebookId */
        facebookId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            unique: true,
            roles: { root: true }
        },
        /* PASSWORD */
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len:[6,999999]
            },
            roles: { root: true }
        },
        passwordResetToken: {
            type: DataTypes.STRING,
            roles: { self: true }
        },
        passwordResetTokenExpire: {
            type: DataTypes.DATE,
            roles: { root: true }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: true,
            roles: { root: true }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true
            },
            roles: {
                self: true,
                admin: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len:[0,30]
            }
        },
        about: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len:[0, 600] // UI limit should be 500. this is 100 for buffer in case difference in accounting.
            }
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(6),
            allowNull: true,
            validate: {
                isIn: [[null, '', 'male','female']]
            }
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                isIn: [countryList]
            }
        },
        /* VERIFICATIONS */
        fbProfileIsVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fbToken: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            roles: false
        },
        instagramVerification: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {
                isVerified: false,
                id: null,
                screenName: null
            }
        },
        twitterVerification: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {
                isVerified: false,
                id: null,
                screenName: null
            }
        },
        phoneVerification: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {
                isVerified: false,
                number: null,
                verificationCode: null
            }
        },
        /*
         For bank:
         {
         hasMethod: true,
         type: 'bank',
         details: {
         bankName: 'POSB',
         accountHolderName: 'Tan Ah Gao',
         accountNumber: '687940395'
         }
         }

         For PayPal:
         {
         hasMethod: true,
         type: 'paypal',
         details: {
         accountId: [ this can be phone number or email address ]
         }
         }
         */
        receivePaymentMethod: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {
                hasMethod: false,
                type: null,
                details: {}
            }
        },
        dataMeta: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: {}
        }
    }, {
        timestamps: true,
        tableName: 'User',
        instanceMethods: {
            generatePasswordResetToken: function(){
                this.passwordResetToken  = crypto.randomBytes(16).toString('hex');
                this.passwordResetTokenExpire = MOMENT().add(12, 'hours').format(); //add .format()?
                return this;
            },
            authenticate: function(password){
                return encrypter.compareHash(password, this.get({ role: 'root'}).salt, this.get({ role: 'root'}).password);
            },
            setPassword: function(password){
                var generator   = encrypter.generateHash(password);
                this.password   = generator.hash;
                this.salt       = generator.salt;
                return this;
            },
            clearResetToken: function() {
                this.passwordResetToken = null;
                this.passwordResetTokenExpire = null;
                return this;
            },
            deliverForgetPasswordMail: function() {
                return forgetPasswordMailer(this);
            }
        },
        getterMethods: {
            profilePicturePaths: function() {
                var sizesTemplate = { full: '', medium: '', thumb: '' };
                if (!this.profilePicture) return sizesTemplate;

                var common = process.env.DOMAIN + process.env.PROFILE_PICTURE_PATH + '/';
                for(var key in sizesTemplate) {
                    var suffix = '.jpg';
                    if (key !== 'full') suffix = '-' + key + suffix;
                    sizesTemplate[key] = common + this.profilePicture + suffix;
                }
                return sizesTemplate;
            },
            hasPaymentMethod: function() {
                // if the property receivePaymentMethod does not exist because it wasn't included
                // in the DB call, return `null`
                if (!this.receivePaymentMethod) return null;

                // the property exist, return boolean
                return D.get(this, 'receivePaymentMethod.hasMethod') ? true : false;
            }
        },
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return User;
}

module.exports = User;